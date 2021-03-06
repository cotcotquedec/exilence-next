import useComponentSize from '@rehooks/component-size';
import { inject, observer } from 'mobx-react';
import React, { useRef } from 'react';
import { AccountStore } from '../../store/accountStore';
import { SignalrStore } from '../../store/signalrStore';
import SnapshotHistoryChart from './SnapshotHistoryChart';

interface Props {
  showIndividualTabs?: boolean;
  accountStore?: AccountStore;
  signalrStore?: SignalrStore;
}

const SnapshotHistoryChartContainer: React.FC<Props> = ({
  accountStore,
  signalrStore,
  showIndividualTabs,
}: Props) => {
  let ref = useRef(null);
  let size = useComponentSize(ref);

  const activeProfile = accountStore!.getSelectedAccount.activeProfile;

  const { activeGroup } = signalrStore!;

  return (
    <div ref={ref} style={{ height: '100%', width: '100%' }}>
      <SnapshotHistoryChart
        width={size.width}
        height={size.height}
        groupData={showIndividualTabs ? undefined : activeGroup?.chartData}
        playerData={
          showIndividualTabs
            ? activeProfile?.tabChartData
            : activeProfile?.chartData
        }
        showIndividualTabs={showIndividualTabs}
        stashTabColors={accountStore!.getSelectedAccount.stashTabColors}
      />
    </div>
  );
};

export default inject(
  'accountStore',
  'signalrStore'
)(observer(SnapshotHistoryChartContainer));
