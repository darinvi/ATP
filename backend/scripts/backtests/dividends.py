import json
import pandas as pd
from app.models import Tickers
from datetime import datetime

# In the future I have to change this logic to an API call. Now I will read the data from the jsons I have saved as I don't have an API with historical prices.
def get_candles(ticker):
    # VERY HARDCODED
    with open(f'c:/Users/User/Desktop/prep/handleTrades/candles/{ticker}.json', 'r') as file:
        candles = json.load(file)['Time Series (Daily)']
    return candles

# some of the data calculated in the return, should separate when I add caching
def get_stats(ticker):
    candles = pd.DataFrame([{'date':x[0], **x[1]} for x in get_candles(ticker).items()])
    candles = convert_to_proper_types(candles)
    ex_dates = get_indexes_of_ex_dates(candles, get_ex_dates(ticker))
    dividend_amount = get_dividend_amount(ticker)
    diffs = get_differences(ex_dates, candles, dividend_amount) 
    pos, neg, pct = get_positive_negative_percentage(diffs)
    avg_pos, avg_neg, avg = get_averages(diffs)   
    open_pos, open_neg = get_positive_negative_open(candles, ex_dates)
    avg_pos_open, avg_neg_open, avg_open = get_averages_open(open_pos, open_neg)
    # Was lazy above, but have to separate the func a bit.
    data_close = get_stats_close_against_flat(candles, ex_dates, dividend_amount)
    return {
        'positive': pos,
        'negative': neg,
        'percentage': pct,
        'avg_positive': avg_pos,
        'avg_negative': avg_neg,
        'average': avg,
        'open_pos': len(open_pos),
        'open_neg': len(open_neg),
        'avg_pos_open': avg_pos_open,
        'avg_neg_open': avg_neg_open,
        'avg_open': avg_open,
        'percentage_open': len(open_pos) / ( len(open_pos) + len(open_neg) ) * 100,
        'average_open': sum([*open_pos, *open_neg]) / len([*open_pos, *open_neg]),
        **data_close
    }

# returns an array of ex-dates
def get_ex_dates(ticker):
    with open('c:/Users/User/Desktop/prep/handleTrades/datasets/pref_ex_cmsd_aefc.json', 'r') as file:
        ex_dates = json.load(file)
    return list(map(lambda x: datetime.strptime(x, "%Y-%m-%d"), [x['ex_date'] for x in ex_dates if x['ticker'] == ticker]))

# returns an array of all the indexes of all ex dates
def get_indexes_of_ex_dates(df, dates):
    # returns the index of the row when the ex date happened
    def get_index_by_date(date):
        return df[(df['date'].dt.year == date.year)&(df['date'].dt.month == date.month)&(df['date'].dt.day==date.day)].index[0]
    return list(map(lambda x: get_index_by_date(x), dates))

def get_differences(indexes, df, amount):
    differences = []
    for i in indexes:
        try:
            differences.append({
                'date': df['date'].iloc[i],
                'delta': df['1. open'].iloc[i] - df['4. close'].iloc[i+1] + amount
            })
        except IndexError:
            pass
    return differences

def get_positive_negative_percentage(diffs):
    positive, negative = get_positive_negative(diffs)
    percentage = len(positive) / ( len(positive) + len(negative) ) * 100
    return len(positive), len(negative), percentage

def get_averages(diffs):
    positive, negative = get_positive_negative(diffs)
    avg_positive = sum([diff['delta'] for diff in positive]) / len(positive)
    avg_negative = sum([diff['delta'] for diff in negative]) / len(negative)
    avg = sum([diff['delta'] for diff in diffs]) / len(diffs)
    return avg_positive, avg_negative, avg

def get_positive_negative(diffs):
    return [diff for diff in diffs if diff['delta'] >= 0], [diff for diff in diffs if diff['delta'] < 0]

def convert_to_proper_types(df):
    df['date'] = pd.to_datetime(df['date'])
    for col in ['1. open', '2. high', '3. low', '4. close', '5. volume']:
        df[col] = df[col].astype(float)
    return df

def get_dividend_amount(ticker):
    return Tickers.objects.get(ticker=ticker).dividend_amount

def get_positive_negative_open(candles, indexes):
    changes = list(map(lambda x: candles['4. close'].iloc[x] - candles['1. open'].iloc[x], indexes))
    return [c for c in changes if c >= 0], [c for c in changes if c < 0] 

def get_averages_open(pos, neg):
    avg_pos = sum(pos) / len(pos)
    avg_neg = sum(neg) / len(neg)
    avg = sum([*pos, *neg]) / len([*pos, *neg])
    return avg_pos, avg_neg, avg

def get_stats_close_against_flat(df, indexes, amount):
    def get_ex_date_changes():
        all_changes = []
        for index in indexes:
            change = df['change'].iloc[index]
            all_changes.append(change + amount)
        return all_changes
    df['change'] = df['4. close'] - df['4. close'].shift(-1)
    changes = get_ex_date_changes()
    green = [c for c in changes if c >= 0]
    red = [c for c in changes if c < 0]
    return {
        'green_close': len(green),
        'red_close': len(red),
        'pct_green': len(green) / len(changes) * 100,
        'avg_green': sum(green) / len(green),
        'avg_red': sum(red) / len(red),
        'avg_close': sum(changes) / len(changes)
    }
