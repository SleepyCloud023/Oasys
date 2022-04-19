import base64
auth = "정의령:1234"
auth_bytes = auth.encode('utf-8')
auth_base64 = base64.b64encode(auth_bytes)
auth_base64_str = auth_base64.decode('ascii')

print(auth_base64_str)
