from accounts.models import Mentors
import pandas as pd

def prepare_response(action, data, report_type=None):
    def handle_get_accounts(accounts):
        all_accounts = []
        for acc in [account.split(',') for account in accounts.split('\n')]:
            if len(acc) > 1 and "Account Id" not in acc:
                accId, user, *rest = acc
                accName, *name = user.split()
                name = ' '.join(name)
                all_accounts.append((accId, accName, name))    
        return all_accounts

    map_actions = {
        'login': lambda x: x,
        'accounts': lambda x: handle_get_accounts(x),
        'positions': lambda x: position_response_to_dict(x),
        'report': lambda x: handle_report_types(x, report_type),
    }
    new_data = data
    if action in map_actions.keys():
        new_data = map_actions[action](data)
    return new_data

def handle_report_types(res, type):
    if type == 'trades':
        return transform_trades_matrix(res)

def get_trainees_pk(pk):
    return [trainee.pk for trainee in Mentors.objects.get(user=pk).trainees.all()]

def position_response_to_dict(response_text):
    rows = [txt.split(',') for txt in response_text.split('\n')[1:-1]]
    colnames = list(response_text.split('\n')[0].split(','))
    by_day = {k[0]:[] for k in rows}
    for r in rows:
        by_day[r[0]].append(r[2:])
    for k,v in by_day.items():
        by_day[k] = convert_matrix(v, colnames)
    return by_day

def convert_matrix(lst, colnames):
    df_original = pd.DataFrame(lst, columns=colnames[2:])
    df = df_original[['Symbol', 'Unrealized Delta', 'Qty Traded', 'Realized', 'Comm', 'ECN Fee', 'Regulatory Fees']].copy()
    columns_to_convert = df.columns.difference(['Symbol'])
    df[columns_to_convert] = df[columns_to_convert].map(lambda x: round(float(x), 2))
    df['net'] = (df['Realized'] - df['Comm'] - df['ECN Fee'] - df['Regulatory Fees']).round(2)
    df['total'] = (df['net'] + df['Unrealized Delta']).round(2)
    new_column_names = {
        'Symbol': 'ticker',
        'Unrealized Delta': 'unrealized',
        'Qty Traded': 'quantity',
        'Realized': 'realized',
        'Comm': 'commision',
        'ECN Fee': 'ecn_fee',
        'Regulatory Fees': 'reg_fee'
    }
    df.rename(columns=new_column_names, inplace=True)
    totals = df.drop(columns=['ticker']).sum().to_dict()
    totals['ticker'] = 'TOTALS'
    totals_df = pd.DataFrame(totals, index=[0])
    df = pd.concat([df, totals_df], ignore_index=True)
    columns_to_convert = df.columns.difference(['ticker'])
    df[columns_to_convert] = df[columns_to_convert].map(lambda x: round(float(x), 2))
    json_data = df.set_index('ticker').to_dict(orient='index')
    return json_data


#TRADES
import json, hashlib
from datetime import datetime

def trades_response_to_matrix(data):
    return [line.split(',') for line in data.split('\n') if \
                line.split(',')[0] != '' \
                and 'Opened' not in line \
                and 'Equities' not in line]

def transform_trades_matrix(data):
    trades = []
    last_date = ''
    for line in trades_response_to_matrix(data):
        if len(line) == 1:
            last_date = line[0]
            continue
        trades.append(row_as_object(line, last_date))
    return trades

def add_hash(obj):
    for key, value in obj.items():
        if isinstance(value, datetime):
            obj[key] = value.strftime('%Y-%m-%dT%H:%M:%S')
    obj_json = json.dumps(obj, sort_keys=True)
    trade_hash = hashlib.sha256(obj_json.encode()).hexdigest()
    return trade_hash

       
def row_as_object(row, date):
    date_open, time_open = row[0].split()
    date_open = datetime.strptime(date_open, "%m/%d/%y")
    date = datetime.strptime(date, "%m/%d/%Y")
    as_object = {
        'date_open': date_open,
        'time_open': datetime.strptime(time_open, '%H:%M:%S').strftime('%H:%M:%S'),
        'date_closed': date,
        'time_closed': datetime.strptime(row[1], '%H:%M:%S').strftime('%H:%M:%S'),
        'intraday': True if date_open == date else False,
        'held': row[2],
        'ticker': row[3],
        'type': row[4],
        'entry_price': float(row[5]),
        'exit_price': float(row[6]),
        'quantity': float(row[7]),
        'gross': float(row[8]),
        'commission': float(row[9]),
        'fees': sum(map(float, row[10:13])),
        'net': float(row[13]),
    }
    as_object['hashed'] = add_hash(as_object)
    return as_object