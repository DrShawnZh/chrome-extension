function transCode() {
  return new Promise((resolve) => {
    resolve(`
      console.log('这是替换后的js')
    `);
  });
}

console.log("这是替换后的js， yeah");
