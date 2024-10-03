import { atom } from 'recoil';
import { IContent } from '~/screen/home/Home.tsx';

export interface IFile {
  title: string;
  content: string;
}

export const listAtom = atom<IContent[]>({
  key: 'listAtom',
  default: [],
});

export const dataAtom = atom<string[]>({
  key: 'dataAtom',
  default: [],
});

export const folderPathAtom = atom<string>({
  key: 'folderPathAtom',
  default: '',
});

export const folderLengthAtom = atom<number>({
  key: 'folderLengthAtom',
  default: 1,
});
