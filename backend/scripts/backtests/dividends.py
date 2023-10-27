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

def get_stats(ticker):
    candles = pd.DataFrame([{'date':x[0], **x[1]} for x in get_candles(ticker).items()])
    candles = convert_to_proper_types(candles)
    diffs = get_differences(get_indexes_of_ex_dates(candles, get_ex_dates(ticker)), candles, get_dividend_amount(ticker)) 
    pos, neg, pct = get_positive_negative_percentage(diffs)
    avg_pos, avg_neg, avg = get_averages(diffs)    
    return {
        'positive': pos,
        'negative': neg,
        'percentage': pct,
        'avg_positive': avg_pos,
        'avg_negative': avg_neg,
        'average': avg
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
    return [diff for diff in diffs if diff['delta'] > 0], [diff for diff in diffs if diff['delta'] < 0]

def convert_to_proper_types(df):
    df['date'] = pd.to_datetime(df['date'])
    for col in ['1. open', '2. high', '3. low', '4. close', '5. volume']:
        df[col] = df[col].astype(float)
    return df

def get_dividend_amount(ticker):
    return Tickers.objects.get(ticker=ticker).dividend_amount

