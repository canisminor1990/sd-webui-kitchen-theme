import { DraggablePanel } from '@/components'
import { GithubOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import qs from 'query-string'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { themeIcon } from './style'

const HeaderView = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  #header {
    .tab-nav {
      border: none !important;
      margin: 0 !important;
    }
    button {
      cursor: pointer;
      border: none !important;
      background: transparent !important;
      flex: none;
      transition: all 0.2s ease-in-out;
      padding: 8px !important;
      border-radius: 4px !important;
      margin: 0 !important;
      flex: 0 !important;
      &:hover {
        border: none !important;
        color: var(--color-text) !important;
        background: var(--color-fill-tertiary) !important;
        flex: none;
      }
      &.selected {
        border: none !important;
        background: transparent !important;
        color: var(--color-text) !important;
        flex: none;
        font-weight: 600;
      }
    }
  }
`

interface HeaderProps {
  children: React.ReactNode
  themeMode: 'dark' | 'light'
}

const Header: React.FC<HeaderProps> = ({ children, themeMode }) => {
  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light'
    const gradioURL = qs.parseUrl(window.location.href)
    gradioURL.query.__theme = theme
    window.location.replace(qs.stringifyUrl(gradioURL))
  }, [themeMode])

  return (
    <DraggablePanel placement="top" defaultSize={{ height: 'auto' }}>
      <HeaderView>
        <Logo themeMode={themeMode} style={{ paddingRight: 16 }} />
        {children}
        <Space.Compact>
          <a href="https://github.com/canisminor1990/sd-web-ui-kitchen-theme" target="_blank">
            <Button icon={<GithubOutlined />} />
          </a>
          <Button icon={themeIcon[themeMode]} onClick={handleSetTheme} />
        </Space.Compact>
      </HeaderView>
    </DraggablePanel>
  )
}

export default React.memo(Header)