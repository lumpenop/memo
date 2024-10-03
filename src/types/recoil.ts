import { atom } from 'recoil';

export interface IFile {
  title: string;
  content: string;
}
export const fileAtom = atom({
  key: 'fileAtom',
  default: { title: '', content: '' },
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
