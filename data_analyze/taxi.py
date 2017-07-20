import pandas as pd
import numpy as np
from pandas import Series,DataFrame

def resample_with_freq(freq,taxi_ids,data):
    dst = []
    for taxi_id in taxi_ids:
        one_taxi_data = data[data['taxiid'] == taxi_id]
        resample_data = one_taxi_data.resample(freq).mean()
        dst.append(resample_data)
    return pd.concat(dst,keys = taxi_ids)

if __name__ == '__main__':
    names = ['taxiid','date_time','lon','al','direction','speed','state1','state2','state3']
    data = pd.read_csv('./taxi.csv',encoding = 'gbk',names = names,low_memory = False)
    data['date_time'] = pd.DatetimeIndex(data['date_time'])
    # delete some useless columns
    del data['state1']
    del data['state2']
    del data['state3']
    del data['speed']
    del data['direction']

    data.set_index('date_time', inplace = True)
    May_first_data = data['2014/05/01']
    taxi_ids = May_first_data['taxiid'].unique()
    dst = resample_with_freq('5T',taxi_ids,May_first_data)
    dst.to_csv('tmp.csv')

