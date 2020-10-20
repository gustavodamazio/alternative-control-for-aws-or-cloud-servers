export default interface Machine {
  id: number
  gpu: number
  instance_active: boolean
  instance_id: string
  instance_name: string
  instance_state: string
  instance_type: string
  launch_time: Date
  memory_mb: number
  private_ip_address: string
  sync_first: Date
  sync_last: Date
  v_cpu: number
}
