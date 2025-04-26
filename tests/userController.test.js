import undefined from '../src/userController.js';

const express = require('express');
const { jest } = require('@jest/globals');

jest.mock('./res', () => ({
  status: jest.fn(() => this),
  json: jest.fn(() => this),
  send: jest.fn(() => this),
}));

describe('getUsers controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { method: 'GET' };
    res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
  });

  it('should return users on success', async () => {
    const getUsersSpy = jest.spyOn(require('./getUsers'), 'getUsers');
    getUsersSpy.mockImplementation(() => Promise.resolve({ users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }] }));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }] });
  });

  it('should return error on failure', async () => {
    const getUsersSpy = jest.spyOn(require('./getUsers'), 'getUsers');
    getUsersSpy.mockImplementation(() => Promise.reject({ message: 'Error fetching users' }));

    await expect(getUsers(req, res)).rejects.toThrow();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return a generic error on unknown status', async () => {
    const getUsersSpy = jest.spyOn(require('./getUsers'), 'getUsers');
    getUsersSpy.mockImplementation(() => Promise.reject({ message: 'Unknown status' }));

    await expect(getUsers(req, res)).rejects.toThrow();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return a generic error on unknown error', async () => {
    const getUsersSpy = jest.spyOn(require('./getUsers'), 'getUsers');
    getUsersSpy.mockImplementation(() => Promise.reject(new Error({ message: 'Unknown error' })));

    await expect(getUsers(req, res)).rejects.toThrow();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return a generic success on no response', async () => {
    const getUsersSpy = jest.spyOn(require('./getUsers'), 'getUsers');
    getUsersSpy.mockImplementation(() => Promise.resolve());

    await getUsers(req, res);

    expect(res.send).toHaveBeenCalledTimes(1);
  });
});