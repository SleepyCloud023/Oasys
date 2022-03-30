function idGenerator(startId: number = 0) {
  startId -= 1;

  const generator = () => {
    startId += 1;
    return startId;
  };

  return generator;
}

export default idGenerator;
