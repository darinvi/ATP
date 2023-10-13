from accounts.models import Mentors
import pandas as pd

def prepare_response(action, data):
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
    }
    new_data = data
    if action in map_actions.keys():
        new_data = map_actions[action](data)
    return new_data

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
    df[columns_to_convert] = df[columns_to_convert].map(lambda x: float(x))
    df['Net'] = df['Realized'] - df['Comm'] - df['ECN Fee'] - df['Regulatory Fees']
    df['Total'] = df['Net'] + df['Unrealized Delta']
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
    json_data = df.set_index('ticker').to_dict(orient='index')
    return json_data