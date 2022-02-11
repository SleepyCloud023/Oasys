import sqlalchemy as db

db_config = {
    'user'     : 'root', 		# 1)
    'password' : '3376', 		# 2)
    'host'     : 'localhost', 	# 3)
    'port'     : 3306, 			# 4)
    'database' : 'OasysDB'		# 5)
}
DB_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8"

engine = db.create_engine(DB_URL, encoding = 'utf-8', max_overflow = 0)

connection = engine.connect()
metadata = db.MetaData()
table = db.Table('test', metadata, autoload = True, autoload_with = engine)
print(table.columns.keys())


# select * from table 과 같음
query = db.select([table])

# 쿼리 실행
result_proxy = connection.execute(query)
result_set = result_proxy.fetchall()

# 결과 print 이때 10개만 출력하도록 함. 단순한 set 자료구조의 형태를 하고 있음.
print(type(result_set), type(result_set[0]))
print(result_set[:10])