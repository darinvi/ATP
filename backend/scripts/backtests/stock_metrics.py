import pandas as pd
from datetime import datetime, timedelta

def get_ticker_df(ticker, date):
    path = (
        "c:/Users/User/Desktop/prep/handleTrades/wikipedia_spy_scrape/datasets_by_date"
    )
    counter = 0
    current_date = date
    concat_df = pd.DataFrame({}, columns=["T", "v", "vw", "o", "c", "h", "l", "t", "n"])
    while counter < 20:
        try:
            candles = pd.read_parquet(
                f"{path}/{current_date}.parquet", filters=[("T", "==", ticker.upper())]
            )
            if current_date == date:
                concat_df = candles
            else:
                concat_df = pd.concat([concat_df, candles], ignore_index=True)
            counter += 1
        except Exception as e:
            pass
        current_date = (
            datetime.strptime(current_date, "%Y-%m-%d").date() - timedelta(1)
        ).strftime("%Y-%m-%d")
    return concat_df[::-1]


def compute_metrics(ticker, date):
    df = get_ticker_df(ticker, date)
    df = compute_tr(df)
    df = compute_ranges(df)
    return return_proper_data(df)

def compute_tr(df):
    true_range = pd.DataFrame([])
    true_range["m1"] = df["h"] - df["l"]
    true_range["m2"] = abs(df["h"] - df["c"].shift(1))
    true_range["m3"] = abs(df["l"] - df["c"].shift(1))
    df["tr"] = true_range[["m1", "m2", "m3"]].max(axis=1)
    return df

def compute_ranges(df):
    df['range'] = df['h'] - df['l']
    return df

def return_proper_data(df):
    row = df.iloc[-1]
    atr = df['tr'].mean()
    avg_vol = df['v'].mean()
    yday = df.iloc[-2]['c']
    gap = row['o'] - yday
    avg_range = df['range'].mean()
    current_object =  {
        "range": row['range'],
        "ar": avg_range,
        'rrng': row['range'] / avg_range,
        "tr": row['tr'],
        "atr": atr,
        "rtr": row['tr'] / atr,
        "avgv": avg_vol,
        "vol": row['v'],
        "rvol": row['v'] / avg_vol,
        "open": row['o'],
        "close": row['c'],
        "gap": gap,
        "gap%": gap / yday,
        "chng": row['c'] - yday,
    }
    return prepare_object(current_object)

def prepare_object(obj):
    obj['gap%'] = obj['gap%'] * 100
    obj = {k:round(v,2) for k,v in obj.items()}
    print(obj)
    return obj

def prepare_volume(v):
    return