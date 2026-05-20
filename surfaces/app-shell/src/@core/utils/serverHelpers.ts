// Static export compatible — no cookies(), no server-only
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'
import themeConfig from '@configs/themeConfig'

export const getSettingsFromCookie = async (): Promise<Settings> => {
  return {} as Settings
}

export const getMode = async () => {
  return themeConfig.mode
}

export const getSystemMode = async (): Promise<SystemMode> => {
  const mode = themeConfig.mode
  return (mode === 'system' ? 'dark' : mode) as SystemMode
}

export const getServerMode = async () => {
  const mode = await getMode()
  const systemMode = await getSystemMode()
  return mode === 'system' ? systemMode : mode
}

export const getSkin = async () => {
  return themeConfig.skin || 'default'
}
