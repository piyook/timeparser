import {parse} from '../parse.js';

describe('Parse Function Test Suite', () => {
    it('My Test Case', () => {
      expect(true).toEqual(true);
    });

    it('produces current datetime with now() as input string', () => {

      const nowDateObject = new Date("2021-02-26T20:42:16.652Z");
      const expectedDateObject = new Date("2021-02-26T20:42:16.652Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces datetime minus a year with now()-1y as input string', () => {

      const nowDateObject = new Date("2021-02-26T20:42:16.652Z");
      const expectedDateObject = new Date("2020-02-26T20:42:16.652Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1y");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces datetime plus 10days + 12 hours with now()+10d+12h as input string', () => {

      const nowDateObject = new Date("2022-01-09T09:00:00.00Z");
      const expectedDateObject = new Date("2022-01-19T21:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()+10d+12h");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces datetime plus 10days + 12 hours +1day -6 hrs with now()+10d+12h+1d-6h+3m as input string', () => {

      const nowDateObject = new Date("2022-01-09T09:00:00.00Z");
      const expectedDateObject = new Date("2022-01-20T15:03:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()+10d+12h+1d-6h+3m");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest second with now()-1d@s as input string', () => {

      const nowDateObject = new Date("2021-01-08T09:10:10.40Z");
      const expectedDateObject = new Date("2021-01-07T09:10:10.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@s");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest minute with now()-1d@m as input string', () => {

      const nowDateObject = new Date("2021-01-08T09:10:10.00Z");
      const expectedDateObject = new Date("2021-01-07T09:10:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@m");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest hour with now()-1d@h as input string', () => {

      const nowDateObject = new Date("2021-01-08T09:10:10.00Z");
      const expectedDateObject = new Date("2021-01-07T09:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@h");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest day with now()-1d@d as input string', () => {

      const nowDateObject = new Date("2021-01-08T00:10:10.00Z");
      const expectedDateObject = new Date("2021-01-07T00:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@d");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest month with now()-1y@mon as input string', () => {

      const nowDateObject = new Date("2021-01-08T09:00:00.00Z");
      const expectedDateObject = new Date("2020-01-01T00:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1y@mon");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest year with now()-1d@y as input string', () => {

      const nowDateObject = new Date("2021-06-08T09:10:10.00Z");
      const expectedDateObject = new Date("2021-01-01T00:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@y");
      spy.mockRestore();
      expect(newTime).toEqual(expectedDateObject);
    });

    it('produces an error if now() not used in input string', () => {

      const nowDateObject = new Date("2021-06-08T09:10:10.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now-1d@y");
      spy.mockRestore();
      expect(newTime).toEqual("ERROR: Invalid Expression. Incorrect Modifier : now-1d@y");
    });

    it('produces an error if incorrect operators used in input string', () => {

      const nowDateObject = new Date("2021-06-08T09:10:10.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1d@y+-3h");
      spy.mockRestore();
      expect(newTime).toEqual("ERROR: Invalid Expression. Incorrect Time Unit : now()-1d@y+-3h");
    });

    it('produces an error if incorrect time unit not used in input string', () => {

      const nowDateObject = new Date("2021-06-08T09:10:10.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const newTime = parse("now()-1k@y");
      spy.mockRestore();
      expect(newTime).toEqual("ERROR: Invalid Expression. Incorrect Time Unit : now()-1k@y");
    });
  }

  
  );
  