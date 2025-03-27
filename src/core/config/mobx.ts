import { makeAutoObservable } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { themeStore } from '../stores';

// Habilita o logging do MobX em desenvolvimento
if (__DEV__) {
  enableLogging({
    predicate: () => true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true,
  });
}

// Inicializa o store
makeAutoObservable(themeStore); 