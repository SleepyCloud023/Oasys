import sqlalchemy as db

db_config = {
    'user': 'root', 		# 1)
    'password': '3376', 		# 2)
    'host': 'localhost', 	# 3)
    'port': 3306, 			# 4)
    'database': 'OasysDB'		# 5)
}
DB_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8"

engine = db.create_engine(DB_URL, encoding='utf-8', max_overflow=0)
connection = engine.connect()
metadata = db.MetaData()

table = db.Table('annotation_object', metadata,
                 autoload=True, autoload_with=engine)
query = db.insert(table)

values_list = []
for i in range(1, 8):
    with open("../json/menu_"+str(i)+".json", "r") as f:
        annotation_json = f.read()
    query = db.update(table).where(table.columns.id ==
                                   i).values(annotation=annotation_json)
    result_proxy = connection.execute(query)

print("Success!")

result_proxy.close()
