import { OneCycleDescriptor } from '../../components/one-cycle-descriptor';
import {
  StackingStep as Step,
  StackingStepDescription as Description,
} from '../../components/stacking-form-step';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Stepper } from '@components/stepper';
import { MAX_STACKING_CYCLES, MIN_STACKING_CYCLES } from '@constants/index';
import { useField } from 'formik';
import React, { FC } from 'react';

interface ChooseCycleStepProps {
  cycles: number;
}

export const ChooseCycleField: FC<ChooseCycleStepProps> = props => {
  const { cycles } = props;
  const [_field, meta, helpers] = useField('cycles');

  return (
    <Step title="Duration">
      <Description>
        Every cycle, each of your reward slots will be eligible for rewards.
      </Description>

      <Stepper
        mt="loose"
        amount={cycles}
        onIncrement={cycle => {
          if (cycle > MAX_STACKING_CYCLES) return;
          helpers.setValue(cycle);
        }}
        onDecrement={cycle => {
          if (cycle < MIN_STACKING_CYCLES) return;
          helpers.setValue(cycle);
        }}
      />
      <OneCycleDescriptor mt="loose" />
      {meta.touched && meta.error && (
        <ErrorLabel>
          <ErrorText>{meta.error}</ErrorText>
        </ErrorLabel>
      )}
    </Step>
  );
};
