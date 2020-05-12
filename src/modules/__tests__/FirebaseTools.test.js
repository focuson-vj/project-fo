import FirebaseTools from "../FirebaseTools";

describe('Add a data', () => {
  test('Add a data', () => {
    expect(FirebaseTools("action", "new-doc")).toBe("Set data!");
  });
});