import { Icon, Swatches } from '@lobehub/ui';
import { Button, Divider, Form, Input, InputNumber, Segmented, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Palette, PanelLeftClose, PanelRightClose, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { NeutralColor, PrimaryColor, WebuiSetting, defaultSetting, useAppStore } from '@/store';
import { neutralColorScales } from '@/styles/neutralColors';

import { useStyles } from './style';

const { Item } = Form;

const findKey = (object: { [key in string]: string }, value: string): any => {
  const res: { [key: string]: PrimaryColor } = {};
  for (const key of Object.keys(object)) {
    // @ts-ignore
    res[object[key]] = key;
  }
  return res[value];
};

const SettingForm = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting, shallow);
  const [showCustom, setShowCustom] = useState<boolean>(setting.logoType === 'custom');
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor | undefined>(
    setting.primaryColor || undefined,
  );
  const [neutralColor, setNeutralColor] = useState<NeutralColor | undefined>(
    setting.neutralColor || undefined,
  );

  const { styles, theme } = useStyles();

  const colors = useMemo(
    () => ({
      blue: theme.blue,
      cyan: theme.cyan,
      geekblue: theme.geekblue,
      gold: theme.gold,
      green: theme.green,
      lime: theme.lime,
      magenta: theme.magenta,
      orange: theme.orange,
      purple: theme.purple,
      red: theme.red,
      volcano: theme.volcano,
      yellow: theme.yellow,
    }),
    [theme],
  );

  const neutralColors = useMemo(
    () => ({
      mauve: neutralColorScales.mauve.light[9],
      olive: neutralColorScales.olive.light[9],
      sage: neutralColorScales.sage.light[9],
      sand: neutralColorScales.sand.light[9],
      slate: neutralColorScales.slate.light[9],
    }),
    [],
  );

  const onReset = useCallback(() => {
    onSetSetting(defaultSetting);
    (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
  }, []);

  const onFinish = useCallback(
    (value: WebuiSetting) => {
      onSetSetting({ ...value, neutralColor, primaryColor });
      (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
    },
    [primaryColor, neutralColor],
  );

  return (
    <Form className={styles.form} initialValues={setting} layout="horizontal" onFinish={onFinish}>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={TextCursorInput} />
          Promot Textarea
        </div>
        <Item className={styles.item} label="Display mode" name="promotTextarea">
          <Segmented options={['scroll', 'resizable']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item
          className={styles.item}
          label="Prompt editor"
          name="promptEditor"
          valuePropName="checked"
        >
          <Switch />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={PanelLeftClose} />
          QuickSetting Sidebar
        </div>
        <Item
          className={styles.item}
          label="Default expand"
          name="sidebarExpand"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Display mode" name="sidebarFixedMode">
          <Segmented options={['fixed', 'float']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default width" name="sidebarWidth">
          <InputNumber />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={PanelRightClose} />
          ExtraNetwork Sidebar
        </div>
        <Item
          className={styles.item}
          label="Enable"
          name="enableExtraNetworkSidebar"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Display mode" name="extraNetworkFixedMode">
          <Segmented options={['fixed', 'float']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item
          className={styles.item}
          label="Default expand"
          name="extraNetworkSidebarExpand"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default width" name="extraNetworkSidebarWidth">
          <InputNumber />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default card size" name="extraNetworkCardSize">
          <InputNumber />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={Palette} />
          Theme
        </div>
        <Item className={styles.item} label="Primary color">
          <Swatches
            activeColor={primaryColor ? colors[primaryColor] : undefined}
            colors={[
              theme.red,
              theme.orange,
              theme.gold,
              theme.yellow,
              theme.lime,
              theme.green,
              theme.cyan,
              theme.blue,
              theme.geekblue,
              theme.purple,
              theme.magenta,
              theme.volcano,
            ]}
            onSelect={(c) => setPrimaryColor(c ? findKey(colors, c) : undefined)}
          />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Neutral Color">
          <Swatches
            activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
            colors={Object.values(neutralColors)}
            onSelect={(c) => setNeutralColor(c ? findKey(neutralColors, c) : undefined)}
          />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Logo type" name="logoType">
          <Segmented
            onChange={(v) => setShowCustom(v === 'custom')}
            options={['lobe', 'kitchen', 'custom']}
          />
        </Item>
        {showCustom && (
          <>
            <Item className={styles.item} label="Logo url" name="logoCustomUrl">
              <Input />
            </Item>
            <Item className={styles.item} label="Logo title" name="logoCustomTitle">
              <Input />
            </Item>
          </>
        )}
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Use svg icons" name="svgIcon" valuePropName="checked">
          <Switch />
        </Item>
      </div>
      <div className={styles.footer}>
        <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
          Reset
        </Button>
        <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
          Apply and restart UI
        </Button>
      </div>
    </Form>
  );
});

export default SettingForm;