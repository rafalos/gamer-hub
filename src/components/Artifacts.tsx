export type Variant = 'default' | 'nintendo' | 'xbox' | 'pc' | 'playstation';

type Props = {
  variant?: Variant;
};

const variantMap: Record<Variant, string> = {
  default: 'bg-primary/7',
  nintendo: 'bg-nintendo/7',
  xbox: 'bg-xbox/7',
  pc: 'bg-pc/7',
  playstation: 'bg-playstation/7',
};

const Artifacts = ({ variant = 'default' }: Props) => (
  <>
    <div
      className={`w-[50%] h-[70%] ${variantMap[variant]} absolute left-0 blur-[600px] z-[-1]`}
    ></div>
    <div className='w-[50%] h-[70%] bg-white/20 absolute right-0 bottom-0 blur-3xl z-[-1]'></div>
  </>
);

export default Artifacts;
