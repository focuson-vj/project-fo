import FirebaseTools from "../FirebaseTools";

describe('Add a data', () => {
  test('Increment a data.', async () => {
    const data = await FirebaseTools("action", "new-doc");
    expect(data).toBe("hehehe");
  });
});