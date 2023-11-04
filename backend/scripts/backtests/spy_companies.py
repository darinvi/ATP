import requests, json
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import pandas as pd

# def get_spy_companies():
#     URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
#     response = requests.get(URL)
#     companies = []
#     if response.status_code == 200:
#         soup = BeautifulSoup(response.content, "html.parser")
#         constituents = soup.find("table", {"id": "constituents"}).find('tbody')
#         rows = constituents.find_all("tr")
#         for row in rows:
#             try:
#                 company = row.find_all("td")[0].text.strip()
#                 companies.append(company)
#             except IndexError:
#                 print(row)
#     else:
#         print("ERR ->", response.status_code)
#     return companies


def get_spy_companies(symbols=None):
    with open('c:/Users/User/Desktop/prep/handleTrades/wikipedia_spy_scrape/tickers.json', 'r') as json_file:
        tickers = json.load(json_file)['tickers']
    diffs = {}
    starting_date = '2023-03-09'
    date_format = '%Y-%m-%d'
    last_date =  datetime.strptime(starting_date, date_format).date()
    while last_date < datetime.now().date():
        try:
            yesterday = pd.read_parquet(f'c:/Users/User/Desktop/prep/handleTrades/wikipedia_spy_scrape/datasets_by_date/{last_date.strftime("%Y-%m-%d")}.parquet')[['T', 'c']]
            today = pd.read_parquet(f'c:/Users/User/Desktop/prep/handleTrades/wikipedia_spy_scrape/datasets_by_date/{(last_date + timedelta(1)).strftime("%Y-%m-%d")}.parquet')[['T', 'c']]
            if symbols:
                yesterday = yesterday[yesterday['T'].isin(tickers)]
                today = today[today['T'].isin(tickers)]
            diff = pd.merge(yesterday, today, on='T')
            diff['diff'] = diff['c_y'] - diff['c_x']
            green = diff[diff['diff'] > 0]
            last_date = last_date + timedelta(1)
            diffs[last_date.strftime("%Y-%m-%d")] = len(green)/len(diff)*100
        except FileNotFoundError:
            # print("NO FILE --->", last_date.strftime("%Y-%m-%d"))
            last_date = last_date + timedelta(1)
    return diffs