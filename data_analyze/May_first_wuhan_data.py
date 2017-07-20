import numpy as np
import pandas as pd
from pandas import Series,DataFrame

if __name__ == '__main__':
    data = pd.read_csv('./aqi_hourly_to_2016-02-04.csv',encoding = 'gbk', low_memory = False)
    wuhan_data = data[(data['locationid'] > 622)&(data['locationid'] < 633)]
    read_date= wuhan_data['unix_time'].map(lambda x: pd.to_datetime(x,unit='s'))
    wuhan_data['read_date'] = read_date
    wuhan_data.set_index('read_date',inplace = True)
    May_first_wuhan_data = wuhan_data['2014/5/1']
    May_first_wuhan_data_json = May_first_wuhan_data.reset_index().set_index(['locationid','read_date'])
    May_first_wuhan_data_json.to_json('May_first_wuhan_data_bak.json')