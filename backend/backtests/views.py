from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from django.http import JsonResponse
from scripts.backtests.dividends import get_stats
from scripts.backtests.spy_companies import get_spy_companies

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_dividend_stats(request, ticker):
    return JsonResponse(get_stats(ticker.upper()))


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_spy(request):
    return JsonResponse({'diffs': get_spy_companies()})


# EX-div green (allow for filtering on PFF/TLT/SPY up for past x days / above/below a certain MA).

# Create the slideshow of ex_dates.

# This is towards filings but: prefs also have full name. Checking for the name / part of the name in a new filing can be a way of scanning for calls and stuff.
# Also check for "redeem", "callable" and stuff like that. If 'Use of proceeds', focus on it when opening the filing?

# Allow for creating a bucket of different prefs and seeing cumulative stats

# Show average intraday change relative to the open

# Visualize the after div flat on the chart.

# On the backtests, cache stuff

# Regression of chance of a green day (green week) based on num of stocks closed below a certain ma (on the daily or on the weekly). 
# Overall RVOL of the market to explain the chance of next day/week being a second day(week) play? 

# Expected range today based on number of stocks above/below ATR. Average ATR for the market.