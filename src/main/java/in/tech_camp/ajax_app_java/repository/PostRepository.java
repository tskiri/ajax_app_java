package in.tech_camp.ajax_app_java.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import in.tech_camp.ajax_app_java.entity.PostEntity;

@Mapper
public interface PostRepository {
  @Select("select * from posts order by created_at desc")
  List<PostEntity> findAll();

  // 新規投稿（@Insert）したら一緒にIDが生成される（@Options）
  @Insert("insert into posts (content) values (#{content})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void insert(PostEntity post);

  @Select("SELECT * FROM posts WHERE id = #{id}")
  PostEntity findById(int id);
}
