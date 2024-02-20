import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

import requests

# Load the data
response = requests.get('https://api.imamkatz.com/suffer') 
data = response.json()

#head = pd.DataFrame(data).head()
#           suffer lifetime_plotas plota check                           session      timestamp
# 0     dedcel.eth             427  4256    39  0DMnGkH2qOhYOMoAbiBA_hwM_8zoXGv3  1702863412933
# 1  katzworld.eth            5896   120    50  mzC7qE9JGRl3HWfMqY-g57pglDx9jTlE  1707101089362

breakdown = pd.DataFrame(data)
breakdown['timestamp'] = pd.to_datetime(breakdown['timestamp'], unit='ms')
breakdown['lifetime_plotas'] = pd.to_numeric(breakdown['lifetime_plotas'])
breakdown['plota'] = pd.to_numeric(breakdown['plota'])
breakdown['check'] = pd.to_numeric(breakdown['check'])
breakdown['session'] = breakdown['session'].astype('category')
breakdown['suffer'] = breakdown['suffer'].astype('category')

start_points = breakdown[breakdown['check'] == 0].to_dict('records')
highest_lifetime_plotas = breakdown['lifetime_plotas'].max()
highest_lifetime_suffer = breakdown[breakdown['lifetime_plotas'] == highest_lifetime_plotas].to_dict('records') 
print("Highest lifetime_plotas:", highest_lifetime_plotas , highest_lifetime_suffer)

starting_plots = [point['plota'] for point in start_points]
starting_lifetime_plotas = [point['lifetime_plotas'] for point in start_points]

starting_suffer = [point['suffer'] for point in start_points]
#uniq suffer 
uniq_suffer = breakdown['suffer'].unique()
#remov null undefined and null entries in unique suffer
uniq_suffer = [x for x in uniq_suffer if x is not None]
uniq_suffer = [x for x in uniq_suffer if x != 'undefined']
uniq_suffer = [x for x in uniq_suffer if x != 'null']
entries_greater_than_zero = len(breakdown[breakdown['check'] > 0].to_dict('records'))

print("number of trips",entries_greater_than_zero)
print("Unique suffer(s):", uniq_suffer)

starting_timestamp = [point['timestamp'] for point in start_points]
starting_session = [point['session'] for point in start_points]
