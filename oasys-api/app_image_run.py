import app_image

if __name__ == "__main__":
    app_image = app_image.create_app()
    app_image.run(host='0.0.0.0', port=5001, debug=True)
