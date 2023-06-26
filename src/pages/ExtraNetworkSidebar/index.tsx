import { DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';

import { SidebarContainer, SidebarHeader } from '@/components';
import { useAppStore } from '@/store';
import { DivProps } from '@/types/index';

import Inner from './Inner';
import { useStyles } from './style';

export interface ExtraNetworkSidebarProps extends DivProps {
  headerHeight: number;
}

const ExtraNetworkSidebar = memo<ExtraNetworkSidebarProps>(({ headerHeight }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const [expand, setExpand] = useState<boolean>(setting.extraNetworkSidebarExpand);
  const [pin, setPin] = useState<boolean>(setting.extraNetworkFixedMode === 'fixed');
  const { mobile } = useResponsive();
  const { styles } = useStyles({ headerHeight });

  useEffect(() => {
    const index2indexExtraNetworkButton = gradioApp().querySelector(
      'button#img2img_extra_networks',
    ) as HTMLButtonElement;
    const t2indexExtraNetworkButton = gradioApp().querySelector(
      'button#txt2img_extra_networks',
    ) as HTMLButtonElement;

    if (index2indexExtraNetworkButton) {
      index2indexExtraNetworkButton.onclick = () => setExpand(!expand);
    }
    if (t2indexExtraNetworkButton) {
      t2indexExtraNetworkButton.onclick = () => setExpand(!expand);
    }

    if (mobile) setExpand(false);
  }, [expand]);

  return (
    <DraggablePanel
      defaultSize={{ width: setting.extraNetworkSidebarWidth }}
      expand={expand}
      minWidth={setting.extraNetworkSidebarWidth}
      mode={pin ? 'fixed' : 'float'}
      onExpandChange={setExpand}
      pin={pin}
      placement="right"
    >
      <LayoutSidebarInner>
        <SidebarContainer className={styles.container}>
          <SidebarHeader pin={pin} position="right" setPin={setPin} title="ExraNetworks" />
          <Inner />
        </SidebarContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default ExtraNetworkSidebar;