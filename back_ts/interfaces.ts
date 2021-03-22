interface todoFromDb {
  _id: object;
  name: string;
  isCompleted: boolean;
  order: number;
}

interface IError extends Error {
  status: number;
}
