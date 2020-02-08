module.exports = (client, value) => {
  const headers = client.getSoapHeaders();
  if (!headers || !headers.length) {
    client.addSoapHeader(value);
  } else {
    // find the current auth header index
    const index = headers.findIndex((header) => /^<fueloauth>/.test(header));
    if (index == null) {
      client.addSoapHeader(value);
    } else {
      client.changeSoapHeader(index, value);
    }
  }
};
