import app_dev

if __name__ == "__main__":
    app_dev = app_dev.app
    app_dev.run(host='0.0.0.0', port=5001, debug=True)
