import * as Ug from "../../chart";
import { ChartMgxcParser } from "../mgxc";
import { readFileSync } from "fs";


describe("ChartMgxcParser", () => {
  test("basic", () => {
    let chart = ChartMgxcParser._parse(readFileSync(__dirname + "/test.mgxc", { encoding: "utf-8" }));
    if (chart === null)
      throw new Error("failed to parse");
    
    expect(chart._meta._songId).toBe("aaaa");
    expect(chart._meta._title).toBe("bbbb");
    expect(chart._meta._artist).toBe("cccc");
    expect(chart._meta._genre).toBe("0000");
    expect(chart._meta._designer).toBe("eeee");
    expect(chart._meta._diff).toBe(Ug.ChartDiff.MASTER);
    expect(chart._meta._playLevel).toBe("hoge");
    expect(chart._meta._weAttr).toBe("fuga");
    expect(chart._meta._chartConst).toBe(22.33);
    expect(chart._meta._bgmFileName).toBe("ffff");
    expect(chart._meta._bgmOffset).toBe(44.55);
    expect(chart._meta._bgmPreviewTime[0]).toBe(55.44);
    expect(chart._meta._bgmPreviewTime[1]).toBe(66.55);
    expect(chart._meta._jacketFileName).toBe("gggg");
    expect(chart._meta._bgFileName).toBe("hhhh");
    expect(chart._meta._bgSceneId).toBe("iiii");
    expect(chart._meta._bgSync).toBe(true);
    expect(chart._meta._fieldColor).toBe("C0FFEE");
    expect(chart._meta._fieldBgFileName).toBe("jjjj");
    expect(chart._meta._fieldBgSceneId).toBe("kkkk");
    expect(chart._meta._measTimelineId).toBe(3333);
    expect(chart._meta._mainBpm).toBe(33.44);
    expect(chart._meta._tutorial).toBe(true);
    expect(chart._meta._startOffset).toBe(false);
    expect(chart._meta._useClick).toBe(true);
    expect(chart._meta._margeExSlideHold).toBe(false);
    expect(chart._meta._bgmWaitForCompletion).toBe(true);
    expect(chart._meta._authorsInfo._authors).toBe("aa");
    expect(chart._meta._authorsInfo._sites).toBe("bb");
    expect(chart._meta._downloadUrl).toBe("llll");
    expect(chart._meta._licenseInfo._copyright).toBe("mmmm");
    expect(chart._meta._licenseInfo._type).toBe("nnnn");
    expect(chart._meta._licenseInfo._url).toBe("oooo");
  });
});
