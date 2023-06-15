import { LineIteratior, toBoolean } from "../parser-util";

describe("LineIteratior", () => {
  test("basic", () => {
    let buf = "012\n" +
              "345\n" + 
              "678";
            
    let itr = new LineIteratior(buf);
    let ret = [...itr];
    expect(ret.length).toBe(3);
    expect(ret[0]).toBe("012");
    expect(ret[1]).toBe("345");
    expect(ret[2]).toBe("678");
  });

  test("brank line", () => {
    let buf = "012\n" +
              "\n" + 
              "345\n" +
              "678";
            
    let itr = new LineIteratior(buf);
    let ret = [...itr];
    expect(ret.length).toBe(4);
    expect(ret[0]).toBe("012");
    expect(ret[1]).toBe("");
    expect(ret[2]).toBe("345");
    expect(ret[3]).toBe("678");
  });

  test("cr-lf", () => {
    let buf = "012\r\n" +
              "345\r\n" + 
              "678";
            
    let itr = new LineIteratior(buf);
    let ret = [...itr];
    expect(ret.length).toBe(3);
    expect(ret[0]).toBe("012");
    expect(ret[1]).toBe("345");
    expect(ret[2]).toBe("678");
  });

  test("last brank line", () => {
    let buf = "012\n" +
              "345\n" + 
              "678\n" +
              "901\n";
            
    let itr = new LineIteratior(buf);
    let ret = [...itr];
    expect(ret.length).toBe(4);
    expect(ret[0]).toBe("012");
    expect(ret[1]).toBe("345");
    expect(ret[2]).toBe("678");
    expect(ret[3]).toBe("901");
  });
});


describe("toBoolean", () => {
  test("basic", () => {
    expect(toBoolean("1")).toBe(true);
    expect(toBoolean("0")).toBe(false);
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("True")).toBe(false);
    expect(toBoolean("y")).toBe(true);
    expect(toBoolean("Y")).toBe(false);
    expect(toBoolean("yes")).toBe(true);
    expect(toBoolean("Yes")).toBe(false);
    expect(toBoolean("YES")).toBe(false);
    expect(toBoolean("enable")).toBe(true);
    expect(toBoolean("Enable")).toBe(false);
    expect(toBoolean("ENABLE")).toBe(false);
    expect(toBoolean("enabled")).toBe(true);
    expect(toBoolean("Enabled")).toBe(false);
    expect(toBoolean("ENABLED")).toBe(false);
  });
});

