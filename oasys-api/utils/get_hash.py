from werkzeug.security import generate_password_hash, check_password_hash

target = "1234"
hash_val = generate_password_hash(target)
print(hash_val)
