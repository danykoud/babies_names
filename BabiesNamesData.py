import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table

from config import connect_string

class BabiesNamesData():

    def __init__(self):
        self.engine = create_engine(connect_string)
        # self.conn = self.engine.connect()
        self.connect_string = connect_string
        self.inspector = inspect(self.engine)
        self.tables = self.inspector.get_table_names()
        self.Base = automap_base()
        self.Base.prepare(self.engine, reflect=True)
        self.names = self.Base.classes['names']
        self.meta = MetaData()
        self.TestResults = Table('test_results_view', self.meta, 
                    autoload_with=self.engine)


def display_db_info(self):
        inspector = inspect(self.engine)
        tables = self.inspector.get_table_names()
        for table in self.tables:
            print("\n")
            print('-' * 12)
            print(f"table '{table}' has the following columns:")
            print('-' * 12)
            for column in self.inspector.get_columns(table):
                print(f"name: {column['name']}   column type: {column['type']}")



def get_Names_all (self):
        session = Session(self.engine)

        sel = [self.names.name, self.names.state,self.names.sex, self.names.number, self.names.year, self.names.latitude,self.names.longitude,self.names.city]
        results= session.query(*sel).filter(names.year >=2000 ).filter(names.year <=2018)
        all_data=[]
        for result in results: 
            d={}
            d["name"]=result[0]
            d["state"]=result[1]
            d["sex"]=result[2]
            d["number"]=result[3]
            d["year"]=result[4]
            d["latitude"]=result[5]
            d["longitude"]=result[6]
            d["city"]=result[7]

        all_data.append(result)
if __name__ == '__main__':
    info = BabiesNamesData()