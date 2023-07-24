import { VMStatus } from "@/util/types";
import { fetchProxyRequest } from "./base";

type ListGuestResponse = {
  guests: {
    autorun: 0 | 1 | 2;  // 0: off, 1: last state, 2: on
    description: string;
    guest_id: string;
    guest_name: string;
    status: VMStatus;
    storage_id: string;
    storage_name: string;
    vcpu_num: number;
    vram_size: number;
    vdisks: {
      controller: 1 | 2 | 3;  // 1: VirtIO, 2: IDE, 3: SATA
      unmap: boolean;
      vdisk_id: string;
      vdisk_size: number;
    }[];
    vnics: {
      mac: string;
      model: 1 | 2 | 3;  // 1: VirtIO, 2: e1000, 3: rtl8139
      network_id: string;
      network_name: string;
      vnic_id: string;
    }[];
  }[];
};

/**
 * Synology VMM에 정의된 Guest 목록 반환
 * @param domain DSM Domain
 * @param sid 로그인 SID
 */
export const listAllGuests = (domain: string, sid: string) => fetchProxyRequest<ListGuestResponse>(domain, 'entry', {
  api: 'SYNO.Virtualization.API.Guest',
  method: 'list',
  version: '1',
  _sid: sid,
  additional: true,
});

/**
 * VMM Guest 전원켜기
 * @param domain DSM Domain
 * @param sid 로그인 SID
 * @param guestId VM Guest ID
 */
export const powerOnGuest = (domain: string, sid: string, guestId: string) => fetchProxyRequest<{}>(domain, 'entry', {
  api: 'SYNO.Virtualization.API.Guest.Action',
  method: 'poweron',
  version: '1',
  _sid: sid,
  guest_id: guestId,
});

/**
 * VMM Guest 전원끄기 (강제종료)
 * @param domain DSM Domain
 * @param sid 로그인 SID
 * @param guestId VM Guest ID
 */
export const powerOffGuest = (domain: string, sid: string, guestId: string) => fetchProxyRequest<{}>(domain, 'entry', {
  api: 'SYNO.Virtualization.API.Guest.Action',
  method: 'poweroff',
  version: '1',
  _sid: sid,
  guest_id: guestId,
});

/**
 * VMM Guest 전원끄기
 * @param domain DSM Domain
 * @param sid 로그인 SID
 * @param guestId VM Guest ID
 */
export const shutdownGuest = (domain: string, sid: string, guestId: string) => fetchProxyRequest<{}>(domain, 'entry', {
  api: 'SYNO.Virtualization.API.Guest.Action',
  method: 'shutdown',
  version: '1',
  _sid: sid,
  guest_id: guestId,
});
