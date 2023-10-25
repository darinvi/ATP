from datetime import datetime

today_date = datetime.now().strftime("%Y-%m-%d")

POLYGON_API_KEY = 'apglB3aoCuwXtiJfG5sLuGrLgNN1Dh5H'

MARKET_HOLIDAYS = f'https://api.polygon.io/v1/marketstatus/upcoming?apiKey={POLYGON_API_KEY}'

PREFERREDS = f'https://api.polygon.io/v3/reference/tickers?type=PFD&active=true&limit=1000&apiKey={POLYGON_API_KEY}'

EX_DATES_GTE = f'https://api.polygon.io/v3/reference/dividends?ex_dividend_date.gte={today_date}&limit=1000&apiKey={POLYGON_API_KEY}'

