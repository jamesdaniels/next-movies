
import clsx from 'clsx';

import Rating from 'components/Rating';
import LanguagesRuntimeRelease from './LanguagesRuntimeRelease';

const BasicsSection = ({
  className,
  voteAverage,
  spokenLanguages,
  runtime,
  releaseDate
}) => (
  <>
    <div className={clsx('basics-section', className)}>
      <Rating
        withValue
        voteAverage={voteAverage} />
    </div>
    <style jsx>{`
      .basics-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `}</style>
  </>
);

export default BasicsSection;
