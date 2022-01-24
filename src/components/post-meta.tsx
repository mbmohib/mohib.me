import { CalenderIcon, ClockIcon } from '../assets/icons';

interface PostMeta {
  date: string;
  time: number;
}

export default function PostMeta({ date, time }: PostMeta) {
  return (
    <div className="flex flex-col mb-2 sm:flex-row sm:mb-0">
      <div className="flex mb-1 sm:mb-0">
        <CalenderIcon className="mr-1 fill-base-100" />
        {date}
      </div>
      <div className="flex sm:ml-2">
        <ClockIcon className="mr-1 fill-base-100" />
        {time} min read
      </div>
    </div>
  );
}
