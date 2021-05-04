import react from 'react';
import {act, renderHook} from '@testing-library/react-hooks';
import UseOnEnter from '../../../../components/Terminal/components/UseOnEnter';

describe("UseOnEnter", () => {
  it("Kada se pritisne eneter", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput).toStrictEqual([]);
    
    act(() => {
      onEnter("","Enter","","","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    expect(consoleOutput).toStrictEqual([""]);
  });

  it("Invalid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("cad","Enter","","","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[1]).toStrictEqual("Invalid Command");

  });

  it("Valid command sa parametrom", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("cd nesta","Enter","","","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[1]).toStrictEqual("Valid Command!cd nesta!");

  });

  it("Valid command bez parametara", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("ls","Enter","","","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[1]).toStrictEqual("Valid Command!ls!");

  });

  it("Valid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("cd","Enter","","neki","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[0]).toStrictEqual("neki> cd");

  });

  it("Valid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("shutdown -r","Enter","","neki","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput).toStrictEqual(["neki> shutdown -r"]);

  });

  it("Valid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("sitest","Enter","","neki",["shutdown -r"],""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[0]).toStrictEqual("Unesite username: sitest");

  });

  it("Valid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("sitestpasvord","Enter","","neki",["shutdown -r", "sitest"],""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[0]).toStrictEqual("Unesite password: ****");

  });

  it("Valid command", () => {
    const {result} = renderHook(() => UseOnEnter());
    
    let [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;
    
    act(() => {
        onEnter("shutdown -s","Enter","","neki","",""); 
    });

    [ consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token, commands ] = result.current;

    expect(consoleOutput[1]).toStrictEqual("Valid Command!shutdown -s!");

  });

});