import React from 'react';
import { faqs } from '../../assets/faqs';
import FaqItem from './FaqItem';

const FaqList: React.FC = () => {
  return (
    <>
      <ul className='mt-[38px]'>
        {faqs.map((item : any, index : any) => (
          <FaqItem item={item} key={index} />
        ))}
      </ul>
    </>
  );
};

export default FaqList;