import requests
from datetime import timedelta, date
from api import MARKET_HOLIDAYS
from app.models import MarketHolidays

def get_market_holidays():
    holidays = requests.get(MARKET_HOLIDAYS).json()
    closed = list(filter(lambda x: x['status'] == 'closed', holidays))
    
def get_weekends(start_date, end_date):
    def daterange():
        for n in range(int ((end_date - start_date).days) + 1):
            yield start_date + timedelta(n)
    weekends = []
    for single_date in daterange():
        if single_date.weekday() in [5, 6]:  # 5 is Saturday, 6 is Sunday
            weekends.append(single_date)
    return weekends

start_date = date(2023, 1, 1)
end_date = date(2023, 12, 31) 

get_weekends(start_date, end_date)