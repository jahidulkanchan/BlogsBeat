import { motion } from 'framer-motion';
import Faq from 'react-faq-component';
import { IoIosArrowDown } from 'react-icons/io';
import faqIcon from '../assets/faq.webp';

const data = {
  title: '',
  rows: [
    {
      title: <p className="sm:px-2 dark:text-gray-200">What is the purpose of this website?</p>,
      content: (
        <p className="sm:px-2 text-[15px] sm:text-base text-primary opacity-70 dark:text-gray-300 dark:opacity-90">
          Our website provides a platform for users to explore and share content related to various topics, including technology, lifestyle, and more. We aim to create a community where ideas and
          knowledge are shared freely
        </p>
      ),
    },
    {
      title: <p className="sm:px-2 dark:text-gray-200">How can I subscribe to updates?</p>,
      content: (
        <p className="sm:px-2 text-[15px] sm:text-base text-primary opacity-70 dark:text-gray-300 dark:opacity-90">
          To stay updated with the latest posts, simply subscribe to our newsletter by entering your email in the subscription box available at the bottom of every page. You will receive regular
          updates directly in your inbox.
        </p>
      ),
    },
    {
      title: <p className="sm:px-2 dark:text-gray-200">Can I contribute to the website?</p>,
      content: (
        <p className="sm:px-2 text-[15px] sm:text-base text-primary opacity-70 dark:text-gray-300 dark:opacity-90">
          Yes, we welcome contributions! If you would like to submit an article or guest post, please visit our &quot;Contribute&quot; page for more details on how you can share your content with our
          community.
        </p>
      ),
    },
    {
      title: <p className="sm:px-2 dark:text-gray-200">Is there a mobile version of the website?</p>,
      content: (
        <p className="sm:px-2 text-[15px] sm:text-base text-primary opacity-70 dark:text-gray-300 dark:opacity-90">
          Absolutely! Our website is fully responsive, meaning it adjusts to fit your screen on both mobile and desktop devices. You can enjoy all of our content seamlessly, whether you&apos;re on a
          phone, tablet, or desktop.
        </p>
      ),
    },
    {
      title: <p className="sm:px-2 dark:text-gray-200">How do I contact customer support?</p>,
      content: (
        <p className="sm:px-2 text-[15px] sm:text-base text-primary opacity-70 dark:text-gray-300 dark:opacity-90">
          If you need help, you can reach out to our support team by visiting the &quot;Contact Us&quot; page. We offer support via email, and our team is happy to assist with any questions or
          concerns you may have.
        </p>
      ),
    },
  ],
};

const config = {
  animate: true,
  arrowIcon: <IoIosArrowDown className="dark:text-gray-300" />,
  tabFocus: true,
};

const FaqItems = () => {
  return (
    <>
      <section className="px-2 grid grid-cols-12 items-center md:px-5 mx-auto mt-[30px] md:mt-[60px] container">
        <div className="col-span-12 md:col-span-5">
          <motion.div animate={{ rotate: [-10, 0, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
            <img className="mx-auto w-[80%] md:w-[100%] rounded-full dark:brightness-90" src={faqIcon} alt="FAQ illustration" />
          </motion.div>
        </div>
        <div className="col-span-12 md:col-span-7 mt-5 px-2">
          <h2 className="text-2xl font-medium md:font-semibold sm:px-4 dark:text-white">
            Need Help? Check{' '}
            <span
              className="text-secondary dark:text-secondary-dark"
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
              }}>
              Our FAQs
            </span>
          </h2>
          <div className="sm:px-2 mt-5">
            <Faq
              data={data}
              config={config}
              styles={{
                bgColor: 'transparent',
                titleTextColor: 'inherit',
                rowTitleColor: 'inherit',
                rowContentColor: 'inherit',
                arrowColor: 'inherit',
                rowContentPaddingTop: '10px',
                rowContentPaddingBottom: '10px',
                rowContentPaddingLeft: '0px',
                rowContentPaddingRight: '0px',
              }}
              className="dark:bg-gray-800 dark:text-white dark:rounded-lg dark:p-4"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqItems;
