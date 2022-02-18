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
table = db.Table('annotation_object', metadata, autoload = True, autoload_with = engine)
print(table.columns.keys())


query = db.insert(table)

values_list=[]
for i in range(1, 8):
    with open("json/menu_"+str(i)+".json", "r") as f:
        annotation_json = f.read()
    image_url = "http://35.197.111.137:5001/img/menu_"+str(i)+".png"
    image_name = "menu_"+str(i)+".png"
    values_list.append({"annotation" : annotation_json, "image_url" : image_url, "image_name" : image_name})

print("Succes!")
result_proxy = connection.execute(query, values_list)
result_proxy.close()