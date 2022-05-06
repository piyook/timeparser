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
      const currentTime = parse("now()");
      spy.mockRestore();
      expect(currentTime).toEqual(expectedDateObject);
    });

    it('produces datetime minus a year with now()-1y as input string', () => {

      const nowDateObject = new Date("2021-02-26T20:42:16.652Z");
      const expectedDateObject = new Date("2020-02-26T20:42:16.652Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const currentTime = parse("now()-1y");
      spy.mockRestore();
      expect(currentTime).toEqual(expectedDateObject);
    });

    it('produces datetime plus 10days + 12 hours with now()+10d+12h as input string', () => {

      const nowDateObject = new Date("2022-01-09T09:00:00.00Z");
      const expectedDateObject = new Date("2022-01-19T21:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const currentTime = parse("now()+10d+12h");
      spy.mockRestore();
      expect(currentTime).toEqual(expectedDateObject);
    });

    it('produces rounds down datetime to nearest month with now()-1y@mon as input string', () => {

      const nowDateObject = new Date("2021-01-08T09:00:00.00Z");
      const expectedDateObject = new Date("2020-01-01T00:00:00.00Z");
      const spy = jest
        .spyOn(Date, "now")
        .mockImplementation(() => nowDateObject.getTime());
      const currentTime = parse("now()-1y@mon");
      spy.mockRestore();
      expect(currentTime).toEqual(expectedDateObject);
    });
  }

  
  );
  