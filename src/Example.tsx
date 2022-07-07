const buttonStyling = {
  backgroundColor: 'BlueViolet',
  color: 'white',
  borderRadius: '25px',
  border: 0,
  padding: '20px'
};

export type IProps = {
  notifyKaoto?: (title: string, body?: string, variant?: any) => void;
  onButtonClicked?: () => void;
}

const Example = (props: IProps) => {
  const someAction = () => {
    console.log('BANANAS123!');
    if (props.notifyKaoto) {
      props.notifyKaoto('Message from Remote Step Extension!', 'hi from step extension template!', 'success');
    }
  };

  return (
    <button className={'superTest'} style={buttonStyling} onClick={someAction}>Step Extension</button>
  )
};

export default Example;

