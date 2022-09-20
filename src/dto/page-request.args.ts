import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PageRequestArgs {
  @Field({
    description: '페이지 사이즈',
  })
  private pageSize: number;

  @Field({
    description: '페이지 번호',
  })
  private pageNo: number;

  getLimit() {
    return this.pageSize;
  }

  getOffset() {
    return (this.pageNo - 1) * this.pageSize;
  }
}
