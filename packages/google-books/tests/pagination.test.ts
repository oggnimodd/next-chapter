import { describe, expect, it } from "bun:test";
import {
  getPreviousPageCursor,
  getNextPageCursor,
  getTotalPages,
} from "@/services";

describe("getNextPageCursor", () => {
  it("should return the next page if the current page is less than the total number of pages", () => {
    const pagination = { page: 1, pageSize: 10, total: 30 };
    const nextPage = getNextPageCursor(pagination);
    expect(nextPage).toBe(2);
  });

  it("should return null if the current page is equal to the total number of pages", () => {
    const pagination = { page: 3, pageSize: 10, total: 30 };
    const nextPage = getNextPageCursor(pagination);
    expect(nextPage).toBeNull();
  });

  it("should return null if the current page is greater than the total number of pages", () => {
    const pagination = { page: 4, pageSize: 10, total: 30 };
    const nextPage = getNextPageCursor(pagination);
    expect(nextPage).toBeNull();
  });
});

describe("getPreviousPageCursor", () => {
  it("should return the previous page if the current page is greater than 0", () => {
    const pagination = { page: 2, pageSize: 10, total: 30 };
    const previousPage = getPreviousPageCursor(pagination);
    expect(previousPage).toBe(1);
  });

  it("should return null if the current page is less than or equal to 0", () => {
    const pagination = { page: 0, pageSize: 10, total: 30 };
    const previousPage = getPreviousPageCursor(pagination);
    expect(previousPage).toBeNull();
  });
});

describe("getTotalPages", () => {
  it("should return the correct total number of pages when total is exactly divisible by page size", () => {
    const pagination = { pageSize: 10, total: 30 };
    const totalPages = getTotalPages(pagination);
    expect(totalPages).toBe(3);
  });

  it("should return the correct total number of pages when total is not divisible by page size and remainder is less than page size", () => {
    const pagination = { pageSize: 10, total: 33 };
    const totalPages = getTotalPages(pagination);
    expect(totalPages).toBe(4);
  });

  it("should return the correct total number of pages when total is not divisible by page size and remainder is equal to page size", () => {
    const pagination = { pageSize: 10, total: 35 };
    const totalPages = getTotalPages(pagination);
    expect(totalPages).toBe(4);
  });

  it("should return the correct total number of pages when total is not divisible by page size and remainder is more than page size", () => {
    const pagination = { pageSize: 10, total: 36 };
    const totalPages = getTotalPages(pagination);
    expect(totalPages).toBe(4);
  });
});
