db = {
    'user': 'root', 		# 1)
    'password': '3376', 		# 2)
    'host': 'localhost', 	# 3)
    'port': 3306, 			# 4)
    'database': 'OasysDB'		# 5)
}
SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
SQLALCHEMY_TRACK_MODIFICATIONS = False

if __name__ == "__main__":
    print("DB_URL : ", SQLALCHEMY_DATABASE_URI)
