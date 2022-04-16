function idGenerator(startId: number = 0) {
  const generator = () => {
    return startId++;
  };
  return generator;
}

export default idGenerator;
