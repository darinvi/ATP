import requests
from bs4 import BeautifulSoup

def get_spy_companies():
    URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    response = requests.get(URL)
    companies = []
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        constituents = soup.find("table", {"id": "constituents"}).find('tbody')
        rows = constituents.find_all("tr")
        for row in rows:
            try:
                company = row.find_all("td")[0].text.strip()
                companies.append(company)
            except IndexError:
                print(row)
    else:
        print("ERR ->", response.status_code)
    return companies